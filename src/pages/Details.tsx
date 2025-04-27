import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "../components/Card";
import {
  Phone,
  MessageCircle,
  BadgeCheck,
  MapPin,
  ChevronLeft,
} from "lucide-react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

// Define interfaces for API responses
interface ListingImage {
  id: number;
  image_url: string;
}

interface LocationDetails {
  id: number;
  name: string;
  city?: number;
  district?: number;
  ward?: number;
}

interface LandlordDetails {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  kyc_status: string;
}

interface Review {
  id: number;
  tenant: string;
  tenant_details: {
    id: string;
    email: string;
    full_name: string;
    user_type: string;
  };
  listing: number;
  review_text: string;
  rating: number;
  review_date: string;
}

interface Listing {
  id: number;
  landlord: string;
  landlord_details: LandlordDetails;
  title: string;
  description: string;
  price: number;
  area: number;
  price_per_sqm: number;
  property_type: string;
  province: number;
  province_details: LocationDetails;
  district: number;
  district_details: LocationDetails;
  ward: number;
  ward_details: LocationDetails;
  street: number;
  street_details: LocationDetails;
  specific_address: string;
  status: string;
  posting_date: string;
  deleted: boolean;
  images: ListingImage[];
  reviews: Review[];
  average_rating: number;
}

interface SimilarListing {
  id: number;
  title: string;
  price: number;
  area: number;
  property_type: string;
  images: ListingImage[];
  province_details: LocationDetails;
  district_details: LocationDetails;
  ward_details: LocationDetails;
}

const formatPrice = (price: number): string => {
  const million = price / 1_000_000;
  return `${million.toFixed(1).replace(/\.0$/, "")}`;
};

export const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [similarListings, setSimilarListings] = useState<SimilarListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch listing details
  useEffect(() => {
    const fetchListingDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await axios.get(API_ENDPOINTS.LISTING_DETAIL(id));
        setListing(response.data);

        // Fetch similar listings
        const similarResponse = await axios.get(
          API_ENDPOINTS.LISTING_SIMILAR(id),
        );
        setSimilarListings(similarResponse.data.results || []);

        setError(null);
      } catch (err) {
        console.error("Error fetching listing details:", err);
        setError("Không thể tải thông tin bất động sản. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id]);

  // Format address
  const formatAddress = (listing: Listing) => {
    const parts = [
      listing.specific_address,
      listing.ward_details?.name,
      listing.district_details?.name,
      listing.province_details?.name,
    ].filter(Boolean);

    return parts.join(", ");
  };

  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="font-Nunito">
        <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Đang tải dữ liệu...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="font-Nunito">
        <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-red-500">
            {error || "Không tìm thấy thông tin bất động sản"}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-Nunito">
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />

      <main className="ml-40 mt-10 mb-50">
        {/* PHOTOS */}
        <section className="flex items-center gap-[200px]">
          <div className="grid grid-cols-4 grid-rows-3 gap-3 w-[825px]">
            {listing.images.length > 0 ? (
              <>
                <img
                  src={listing.images[0].image_url}
                  alt="Ảnh chính căn hộ"
                  className="col-span-4 row-span-2 object-cover w-full aspect-[21/10] rounded-sm border-2 border-black"
                />
                {listing.images.slice(1, 5).map((image, i) => (
                  <img
                    key={image.id}
                    src={image.image_url}
                    alt={`Ảnh ${i + 1}`}
                    className="object-cover w-full aspect-square rounded-sm"
                  />
                ))}
              </>
            ) : (
              <div className="col-span-4 row-span-2 flex items-center justify-center bg-gray-200 rounded-sm border-2 border-black">
                <p>Không có ảnh</p>
              </div>
            )}
          </div>

          {/* OWNER CONTACT */}
          <div className="flex flex-col space-y-3 items-center">
            <p className="text-[30px] font-semibold">
              Chủ nhà:{" "}
              <span className="text-[#9b0505] mr-2">
                {listing.landlord_details.first_name}{" "}
                {listing.landlord_details.last_name}
              </span>
              <img
                src="/authenticated.svg"
                className="inline"
                alt="Đã xác thực"
              />
            </p>

            <Button className="w-[238px] bg-blue-500 hover:bg-blue-600 text-white text-base font-medium rounded-lg shadow-md py-2">
              <Phone className="w-5 h-5 mr-2" />
              {listing.landlord_details.email}
            </Button>

            <Button className="w-[238px] bg-blue-500 hover:bg-blue-600 text-white text-base font-medium rounded-lg shadow-md">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat
            </Button>
          </div>
        </section>

        {/* TITLE, PRICE, ADDRESS */}
        <section className="grid auto-rows-auto mt-10">
          <div className="flex items-center gap-2">
            <h2 className="text-[30px] font-semibold">{listing.title}</h2>
            <span className="bg-green-200 text-green-800 font-medium px-3 py-1 rounded-full flex items-center">
              <BadgeCheck className="w-4 h-4 mr-1" />
              Đã xác thực
            </span>
          </div>

          <div className="font-semibold text-lg mb-1.5">
            <span>{`${formatPrice(listing.price)} triệu/tháng`}</span>
            <span className="mx-2">|</span>
            <span className="text-[#e7193b]">
              {listing.area} m<sup>2</sup>
            </span>
          </div>

          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{formatAddress(listing)}</span>
          </div>
        </section>

        {/* THÔNG TIN CHI TIẾT */}
        <section className="grid grid-cols-2 gap-y-2 text-lg mt-9 max-w-[522px]">
          <span className="text-gray-500">Loại hình</span>
          <span className="font-medium">
            {listing.property_type.toLowerCase() === "room"
              ? "Phòng trọ"
              : listing.property_type.toLowerCase() === "apartment"
                ? "Căn hộ/Chung cư"
                : listing.property_type.toLowerCase() === "house"
                  ? "Nhà phố"
                  : listing.property_type}
          </span>

          <span className="text-gray-500">Diện tích</span>
          <span className="font-semibold">{listing.area} m²</span>

          <span className="text-gray-500">Giá/m²</span>
          <span className="font-semibold">
            {listing.price_per_sqm.toLocaleString("vi-VN")} triệu/m²
          </span>

          <span className="text-gray-500">Ngày đăng</span>
          <span className="font-semibold">
            {new Date(listing.posting_date).toLocaleDateString("vi-VN")}
          </span>
        </section>

        {/* MÔ TẢ */}
        <section className="mt-9">
          <h3 className="font-bold text-[25px] mb-2">MÔ TẢ CHI TIẾT</h3>
          <div className="text-[20px] whitespace-pre-line">
            {listing.description}
          </div>
        </section>

        {/* ĐÁNH GIÁ */}
        {listing.reviews && listing.reviews.length > 0 && (
          <section className="mt-9">
            <h3 className="font-bold text-[25px] mb-2">ĐÁNH GIÁ</h3>
            <div className="mb-4">
              <span className="text-xl font-semibold">Điểm trung bình: </span>
              <span className="text-[#e7193b] font-bold">
                {listing.average_rating.toFixed(1)}/5
              </span>
            </div>
            <div className="space-y-4">
              {listing.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">
                      {review.tenant_details.full_name}
                    </span>
                    <span className="text-[#e7193b] font-bold">
                      {review.rating}/5
                    </span>
                  </div>
                  <p className="text-gray-700">{review.review_text}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(review.review_date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LIÊN QUAN */}
        {similarListings.length > 0 && (
          <section className="mt-9 mb-[96px] relative">
            <h1 className="font-bold text-[25px] mb-2">LIÊN QUAN</h1>
            <div className="flex gap-10 justify-between mr-14">
              {similarListings.map((item) => (
                <Card
                  key={item.id}
                  title={item.title}
                  picURL={
                    item.images.length > 0 ? item.images[0].image_url : ""
                  }
                  price={item.price.toString()}
                  area={item.area.toString()}
                  addr={`${item.ward_details?.name || ""}, ${item.district_details?.name || ""}, ${item.province_details?.name || ""}`}
                  type={
                    item.property_type.toLowerCase() === "room"
                      ? "Phòng trọ"
                      : item.property_type.toLowerCase() === "apartment"
                        ? "Căn hộ/Chung cư"
                        : item.property_type.toLowerCase() === "house"
                          ? "Nhà phố"
                          : item.property_type
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* BACK BUTTON */}
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full px-4 py-8 text-black hover:bg-gray-100 transition m-7 absolute bottom-[-110px] right-3.5"
          onClick={handleBack}
        >
          <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
            <ChevronLeft size={21} />
          </div>
          <span className="text-[20px] font-medium">VỀ TRANG TRƯỚC</span>
        </Button>
      </main>

      <Footer />
    </div>
  );
};

export default Details;
