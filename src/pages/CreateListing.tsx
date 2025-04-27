import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { listingService } from "../services/listing";
import { toast, Toaster } from "sonner";

interface ListingFormData {
  title: string;
  price: string;
  area: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  specific_address: string;
  property_type: "room" | "apartment" | "house";
  description: string;
  imageUrls: string[];
}

export const CreateListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ListingFormData>({
    title: "",
    price: "",
    area: "",
    province: "",
    district: "",
    ward: "",
    street: "",
    specific_address: "",
    property_type: "room",
    description: "",
    imageUrls: [],
  });
  const [imageInput, setImageInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddImageUrl = () => {
    if (imageInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, imageInput.trim()],
      }));
      setImageInput("");
    }
  };

  const handleRemoveImageUrl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.price.trim() ||
      !formData.area.trim() ||
      !formData.specific_address.trim() ||
      !formData.description.trim()
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }
    setIsSubmitting(true);
    try {
      const listingData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        area: parseFloat(formData.area),
        property_type: formData.property_type,
        province: parseInt(formData.province),
        district: parseInt(formData.district),
        ward: parseInt(formData.ward),
        street: parseInt(formData.street),
        specific_address: formData.specific_address,
        uploaded_images: formData.imageUrls,
        //status: "pending",
      };
      await listingService.createListing(listingData);
      toast.success("Đăng tin thành công!");
      navigate("/profile/landlord");
    } catch {
      toast.error("Có lỗi xảy ra khi đăng tin. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-Nunito">
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />
      <Toaster position="top-right" />

      <main className="max-w-[800px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Đăng tin cho thuê nhà trọ</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="VD: Cho thuê phòng trọ gần Đại học Văn Lang"
              required
            />
          </div>

          {/* Price and Area */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Giá thuê (triệu/tháng)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="VD: 2.5"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Diện tích (m²)</Label>
              <Input
                id="area"
                name="area"
                type="number"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="VD: 25"
                required
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label htmlFor="property_type">Loại hình</Label>
            <select
              id="property_type"
              name="property_type"
              value={formData.property_type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="room">Phòng trọ</option>
              <option value="apartment">Căn hộ</option>
              <option value="house">Nhà nguyên căn</option>
            </select>
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="province">Tỉnh/Thành phố</Label>
              <Input
                id="province"
                name="province"
                type="number"
                value={formData.province}
                onChange={handleInputChange}
                placeholder="ID Tỉnh/Thành phố"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">Quận/Huyện</Label>
              <Input
                id="district"
                name="district"
                type="number"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="ID Quận/Huyện"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ward">Phường/Xã</Label>
              <Input
                id="ward"
                name="ward"
                type="number"
                value={formData.ward}
                onChange={handleInputChange}
                placeholder="ID Phường/Xã"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Đường</Label>
              <Input
                id="street"
                name="street"
                type="number"
                value={formData.street}
                onChange={handleInputChange}
                placeholder="ID Đường"
                required
              />
            </div>
          </div>

          {/* Specific Address */}
          <div className="space-y-2">
            <Label htmlFor="specific_address">Địa chỉ cụ thể</Label>
            <Input
              id="specific_address"
              name="specific_address"
              value={formData.specific_address}
              onChange={handleInputChange}
              placeholder="Số 123, Đường ABC, Phường XYZ"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md min-h-[100px]"
              placeholder="Mô tả chi tiết về phòng trọ, căn hộ..."
              required
            />
          </div>

          {/* Image URLs */}
          <div className="space-y-2">
            <Label>Ảnh (URL)</Label>
            <div className="flex gap-2">
              <Input
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <Button type="button" onClick={handleAddImageUrl}>
                Thêm
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.imageUrls.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={url}
                    alt="listing"
                    className="w-24 h-16 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImageUrl(idx)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs opacity-80 group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white text-lg font-semibold rounded-lg py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang đăng..." : "Đăng tin"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CreateListing;
