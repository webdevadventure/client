import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";

// Define interfaces for the component props and data
interface FilterProps {
  onFilterChange: (filters: Partial<FilterState>) => void;
  currentFilters: FilterState;
}

interface FilterState {
  province: number | null;
  district: number | null;
  property_type: string | null;
  min_price: number | null;
  max_price: number | null;
  search: string | null;
}

interface Province {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
  city: number;
}

export const Filter: React.FC<FilterProps> = ({
  onFilterChange,
  currentFilters,
}) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  // Fetch provinces on component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.PROVINCES);
        setProvinces(response.data.results);
      } catch (err) {
        console.error("Error fetching provinces:", err);
      }
    };

    fetchProvinces();
  }, []);

  const updateFilter = (changes: Partial<FilterState>) => {
    onFilterChange({
      ...currentFilters,
      ...changes,
    });
  };

  // Fetch districts when province changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!currentFilters.province) {
        setDistricts([]);
        return;
      }

      try {
        const response = await axios.get(API_ENDPOINTS.CITIES, {
          params: { province: currentFilters.province },
        });
        setDistricts(response.data.results);
      } catch (err) {
        console.error("Error fetching districts:", err);
      }
    };

    fetchDistricts();
  }, [currentFilters.province]);

  // Handle province change
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value ? parseInt(e.target.value) : null;
    updateFilter({
      province: provinceId,
      district: null, // Reset district when province changes
    });
  };

  // Handle district change
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value ? parseInt(e.target.value) : null;
    updateFilter({ district: districtId });
  };

  // Handle property type change
  const handlePropertyTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const propertyType = e.target.value || null;
    updateFilter({ property_type: propertyType });
  };

  // Handle price range change
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice = e.target.value ? parseInt(e.target.value) : null;
    updateFilter({ min_price: minPrice });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = e.target.value ? parseInt(e.target.value) : null;
    updateFilter({ max_price: maxPrice });
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value || null;
    updateFilter({ search: searchTerm });
  };

  return (
    <div>
      <div className="w-full max-w-sm p-4">
        <h2 className="text-xl font-bold mb-4">TÌM KIẾM</h2>

        {/* Search input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tìm kiếm
          </label>
          <input
            type="text"
            placeholder="Nhập từ khóa tìm kiếm..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentFilters.search || ""}
            onChange={handleSearchChange}
          />
        </div>

        {/* Tỉnh/Thành phố */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tỉnh/Thành phố
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={currentFilters.province || ""}
              onChange={handleProvinceChange}
            >
              <option value="">Tất cả</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Quận/Huyện */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Quận/Huyện
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={currentFilters.district || ""}
              onChange={handleDistrictChange}
              disabled={!currentFilters.province}
            >
              <option value="">Tất cả</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Loại */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Loại
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={currentFilters.property_type || ""}
              onChange={handlePropertyTypeChange}
            >
              <option value="">Tất cả</option>
              <option value="room">Phòng trọ</option>
              <option value="apartment">Căn hộ/Chung cư</option>
              <option value="house">Nhà phố</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Khoảng giá */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Khoảng giá (triệu đồng)
          </label>
          <div className="flex items-center">
            <input
              type="number"
              placeholder="Từ"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              value={currentFilters.min_price || ""}
              onChange={handleMinPriceChange}
            />
            <span className="mx-2">đến</span>
            <input
              type="number"
              placeholder="Đến"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={currentFilters.max_price || ""}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
