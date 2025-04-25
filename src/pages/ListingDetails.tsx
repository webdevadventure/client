import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

interface ListingDetailsData {
  utilities: string[];
  rules: string[];
  deposit: string;
  paymentSchedule: string;
  minContract: string;
  maxOccupants: string;
  gender: string;
  pets: string;
  smoking: string;
  parking: string;
  security: string;
  additionalInfo: string;
}

export const ListingDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ListingDetailsData>({
    utilities: [],
    rules: [],
    deposit: "",
    paymentSchedule: "",
    minContract: "",
    maxOccupants: "",
    gender: "",
    pets: "",
    smoking: "",
    parking: "",
    security: "",
    additionalInfo: "",
  });

  const [newUtility, setNewUtility] = useState("");
  const [newRule, setNewRule] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUtility = () => {
    if (newUtility.trim()) {
      setFormData((prev) => ({
        ...prev,
        utilities: [...prev.utilities, newUtility.trim()],
      }));
      setNewUtility("");
    }
  };

  const handleRemoveUtility = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      utilities: prev.utilities.filter((_, i) => i !== index),
    }));
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setFormData((prev) => ({
        ...prev,
        rules: [...prev.rules, newRule.trim()],
      }));
      setNewRule("");
    }
  };

  const handleRemoveRule = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement listing submission with both basic and detailed info
    console.log(formData);
    navigate("/"); // Navigate back to home after submission
  };

  return (
    <div className="min-h-screen font-Nunito">
      <Header first="Trang chủ" second="Đăng tin" third="Thông tin chi tiết" />

      <main className="max-w-[800px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Thông tin chi tiết</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Utilities */}
          <div className="space-y-2">
            <Label>Tiện ích</Label>
            <div className="flex gap-2">
              <Input
                value={newUtility}
                onChange={(e) => setNewUtility(e.target.value)}
                placeholder="Thêm tiện ích..."
              />
              <Button type="button" onClick={handleAddUtility}>
                Thêm
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.utilities.map((utility, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"
                >
                  <span>{utility}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveUtility(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="space-y-2">
            <Label>Quy định</Label>
            <div className="flex gap-2">
              <Input
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Thêm quy định..."
              />
              <Button type="button" onClick={handleAddRule}>
                Thêm
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.rules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"
                >
                  <span>{rule}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRule(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deposit">Tiền đặt cọc (triệu)</Label>
              <Input
                id="deposit"
                name="deposit"
                type="number"
                value={formData.deposit}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentSchedule">Kỳ hạn thanh toán</Label>
              <Input
                id="paymentSchedule"
                name="paymentSchedule"
                value={formData.paymentSchedule}
                onChange={handleInputChange}
                placeholder="VD: Thanh toán theo tháng"
                required
              />
            </div>
          </div>

          {/* Contract and Occupants */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minContract">
                Thời hạn thuê tối thiểu (tháng)
              </Label>
              <Input
                id="minContract"
                name="minContract"
                type="number"
                value={formData.minContract}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxOccupants">Số người tối đa</Label>
              <Input
                id="maxOccupants"
                name="maxOccupants"
                type="number"
                value={formData.maxOccupants}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Giới tính</Label>
              <Input
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                placeholder="VD: Nam/Nữ/Không yêu cầu"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pets">Thú cưng</Label>
              <Input
                id="pets"
                name="pets"
                value={formData.pets}
                onChange={handleInputChange}
                placeholder="VD: Cho phép/Không cho phép"
                required
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-2">
            <Label htmlFor="smoking">Hút thuốc</Label>
            <Input
              id="smoking"
              name="smoking"
              value={formData.smoking}
              onChange={handleInputChange}
              placeholder="VD: Cho phép/Không cho phép"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parking">Bãi đỗ xe</Label>
            <Input
              id="parking"
              name="parking"
              value={formData.parking}
              onChange={handleInputChange}
              placeholder="VD: Có/Không"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="security">An ninh</Label>
            <Input
              id="security"
              name="security"
              value={formData.security}
              onChange={handleInputChange}
              placeholder="VD: Bảo vệ 24/7, Camera an ninh"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Thông tin thêm</Label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              placeholder="Thông tin bổ sung khác..."
              className="w-full min-h-[100px] p-2 border rounded-md"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/create-listing")}
            >
              Quay lại
            </Button>
            <Button type="submit">Đăng tin</Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default ListingDetails;
