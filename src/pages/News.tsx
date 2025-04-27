import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Frame } from "../components/Frame";
import { Filter } from "../components/Filter";
//import { Pagination } from "../components/Pagination";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import { useRef } from "react";

// Define the type for a listing based on API response
interface Listing {
  id: number;
  title: string;
  area: number;
  description: string;
  property_type: string;
  specific_address: string;
  price: number;
  images: {
    id: number;
    image_url: string;
  }[];
  province_details: {
    id: number;
    name: string;
  };
  district_details: {
    id: number;
    name: string;
  };
  ward_details: {
    id: number;
    name: string;
  };
  street_details: {
    id: number;
    name: string;
  };
  status: string;
  posting_date: string;
}

// Define filter state interface
interface FilterState {
  province: number | null;
  district: number | null;
  property_type: string | null;
  min_price: number | null;
  max_price: number | null;
  search: string | null;
}

export const News: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filterState, setFilterState] = useState<FilterState>({
    province: null,
    district: null,
    property_type: null,
    min_price: null,
    max_price: null,
    search: null,
  });

  const formatPrice = (price: number): string => {
    const million = price / 1_000_000;
    return `${million.toFixed(1).replace(/\.0$/, "")}`;
  };

  const formatArea = (area: number): string => {
    return `${parseFloat(area.toString()).toString()}`;
  };

  const framePerPage = 8;
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement>(null);

  // Fetch listings
  const fetchListings = async (page = 1, replace = false) => {
    setLoading(true);
    try {
      const params: Record<string, any> = {
        page: page,
        page_size: framePerPage,
      };

      if (filterState.province) params.province = filterState.province;
      if (filterState.district) params.district = filterState.district;
      if (filterState.property_type)
        params.property_type = filterState.property_type;
      if (filterState.min_price) params.min_price = filterState.min_price;
      if (filterState.max_price) params.max_price = filterState.max_price;
      if (filterState.search) params.search = filterState.search;

      const response = await axios.get(API_ENDPOINTS.LISTINGS, { params });
      const newListings = response.data.results;

      if (replace) {
        setListings(newListings);
      } else {
        setListings((prev) => [...prev, ...newListings]);
      }

      // Nếu ít hơn 1 page hoặc kết quả rỗng ➔ không còn nữa
      if (newListings.length < framePerPage) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setError(null);
    } catch (err: any) {
      console.error("Error fetching listings:", err);

      // 👇 BẮT 404 ở đây
      if (err.response && err.response.status === 404) {
        console.warn("🛑 Server trả về 404 - Dừng fetching tiếp.");
        setHasMore(false);
      } else {
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Khi filter thay đổi ➔ reset listings
  useEffect(() => {
    setCurrentPage(1);
    fetchListings(1, true); // replace = true
  }, [filterState]);

  // Observer cho Infinite Scroll
  useEffect(() => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        console.log("🛸 Đang ở gần cuối - fetch thêm data");
        setCurrentPage((prev) => prev + 1);
      }
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }
  }, [loading, hasMore]);

  // Fetch thêm listings khi currentPage tăng
  useEffect(() => {
    if (currentPage === 1) return; // Đã load ở trên rồi
    fetchListings(currentPage);
  }, [currentPage]);

  // Handle filter
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div>
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />
      <h1 className="mt-10 mb-6 ml-16 font-Nunito font-bold text-[40px]">
        TIN MỚI
      </h1>

      <div className="grid grid-cols-[7fr_3fr]">
        <div className="ml-16">
          {listings.map((item, index) => {
            const description = [
              `${formatArea(item.area)}m²`,
              item.property_type,
              item.ward_details?.name ||
                item.district_details?.name ||
                item.province_details?.name,
            ].join(" | ");

            const isLast = index === listings.length - 1;

            return (
              <div
                key={item.id}
                ref={isLast ? lastElementRef : undefined} // gắn ref vào phần tử cuối
              >
                <Frame
                  id={item.id.toString()}
                  title={item.title}
                  picURL={item.images[0]?.image_url || null}
                  price={formatPrice(item.price)}
                  area={formatArea(item.area)}
                  addr={`${item.specific_address || ""}, ${item.ward_details?.name || ""}, ${item.district_details?.name || ""}, ${item.province_details?.name || ""}`}
                  type={item.property_type}
                  prop1={description.split(" | ")[0] || ""}
                  prop2={description.split(" | ")[1] || ""}
                  prop3={description.split(" | ")[2] || ""}
                />
              </div>
            );
          })}

          {loading && <div className="text-center py-6">Đang tải...</div>}
          {!hasMore && (
            <div className="text-center py-6 text-gray-400">
              Đã hết tin để hiển thị.
            </div>
          )}
        </div>

        <div className="mr-10">
          <Filter
            onFilterChange={handleFilterChange}
            currentFilters={filterState}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default News;
