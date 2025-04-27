import React, { useRef, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Button } from "../components/ui/button";
import { ChevronLeft } from "lucide-react";
import Webcam from "react-webcam";

const KYCRequest: React.FC = () => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [selfieImage, setSelfieImage] = useState<File | null>(null);
  const [issueDate, setIssueDate] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [cccd, setCCCD] = useState("");

  // Webcam modal state
  const [webcamOpen, setWebcamOpen] = useState<
    null | "front" | "back" | "selfie"
  >(null);
  const webcamRef = useRef<Webcam | null>(null);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  // Chụp ảnh từ webcam
  const handleCapture = (
    setter: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // Convert base64 to File
        fetch(imageSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "webcam.jpg", { type: blob.type });
            setter(file);
            setWebcamOpen(null);
          });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!frontImage || !backImage || !selfieImage || !issueDate || !address) {
      setError("Vui lòng nhập đầy đủ thông tin và ảnh xác minh.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const handleBack = () => {
    window.history.back();
  };

  // Render webcam modal
  const renderWebcamModal = (
    setter: React.Dispatch<React.SetStateAction<File | null>>,
  ) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center">
        {/* @ts-expect-error: react-webcam type is not compatible with JSX in some setups, but works at runtime */}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg w-80 h-60 object-cover mb-4"
          videoConstraints={{ facingMode: "user" }}
        />
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => handleCapture(setter)}
            className="bg-blue-600 text-white"
          >
            Chụp
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setWebcamOpen(null)}
          >
            Hủy
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-Nunito bg-[#f7f7fb] flex flex-col">
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />
      <main className="flex-grow flex justify-center items-center my-7">
        <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-2 text-center">
            Xác minh danh tính
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Vui lòng cung cấp thông tin và hình ảnh để xác minh tài khoản của
            bạn.
          </p>

          {submitted ? (
            <div className="text-center">
              <div className="text-green-600 text-2xl font-semibold mb-4">
                Đã gửi yêu cầu xác minh!
              </div>
              <Button
                onClick={handleBack}
                variant="outline"
                className="mt-4 flex items-center gap-2 mx-auto"
              >
                <ChevronLeft size={20} />
                Quay lại
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Ảnh CCCD mặt trước */}
              <div>
                <label className="block font-medium mb-1">
                  Ảnh CCCD mặt trước <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={frontInputRef}
                    onChange={(e) => handleImageChange(e, setFrontImage)}
                  />
                  <Button
                    type="button"
                    onClick={() => frontInputRef.current?.click()}
                  >
                    {frontImage ? "Đổi ảnh" : "Tải ảnh lên"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setWebcamOpen("front")}
                  >
                    Chụp ảnh
                  </Button>
                  {frontImage && (
                    <img
                      src={URL.createObjectURL(frontImage)}
                      alt="CCCD trước"
                      className="w-24 h-16 object-cover rounded border"
                    />
                  )}
                </div>
                {webcamOpen === "front" && renderWebcamModal(setFrontImage)}
              </div>

              {/* Ảnh CCCD mặt sau */}
              <div>
                <label className="block font-medium mb-1">
                  Ảnh CCCD mặt sau <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={backInputRef}
                    onChange={(e) => handleImageChange(e, setBackImage)}
                  />
                  <Button
                    type="button"
                    onClick={() => backInputRef.current?.click()}
                  >
                    {backImage ? "Đổi ảnh" : "Tải ảnh lên"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setWebcamOpen("back")}
                  >
                    Chụp ảnh
                  </Button>
                  {backImage && (
                    <img
                      src={URL.createObjectURL(backImage)}
                      alt="CCCD sau"
                      className="w-24 h-16 object-cover rounded border"
                    />
                  )}
                </div>
                {webcamOpen === "back" && renderWebcamModal(setBackImage)}
              </div>

              {/* Ảnh khuôn mặt */}
              <div>
                <label className="block font-medium mb-1">
                  Ảnh khuôn mặt <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={selfieInputRef}
                    onChange={(e) => handleImageChange(e, setSelfieImage)}
                  />
                  <Button
                    type="button"
                    onClick={() => selfieInputRef.current?.click()}
                  >
                    {selfieImage ? "Đổi ảnh" : "Tải ảnh lên"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setWebcamOpen("selfie")}
                  >
                    Chụp ảnh
                  </Button>
                  {selfieImage && (
                    <img
                      src={URL.createObjectURL(selfieImage)}
                      alt="Khuôn mặt"
                      className="w-24 h-16 object-cover rounded border"
                    />
                  )}
                </div>
                {webcamOpen === "selfie" && renderWebcamModal(setSelfieImage)}
              </div>

              {/* Nhập CCCD */}
              <div>
                <label className="block font-medium mb-1">
                  Nhập CCCD của bạn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cccd}
                  onChange={(e) => setCCCD(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập số CCCD"
                  required
                />
              </div>

              {/* Ngày cấp CCCD */}
              <div>
                <label className="block font-medium mb-1">
                  Ngày cấp CCCD <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className="border rounded px-3 py-2 w-full"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  required
                />
              </div>

              {/* Nơi đăng ký thường trú */}
              <div>
                <label className="block font-medium mb-1">
                  Nơi đăng ký thường trú <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-full"
                  placeholder="Nhập địa chỉ thường trú trên CCCD"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm mb-2">{error}</div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white text-lg font-semibold rounded-lg py-2"
              >
                Gửi yêu cầu xác minh
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="w-full flex items-center gap-2 justify-center"
              >
                <ChevronLeft size={20} />
                Quay lại
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KYCRequest;
