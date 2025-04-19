import React from "react";

export const Filter: React.FC = () => {
  return (
    <div>
      <div className="w-full max-w-sm p-4">
        <h2 className="text-xl font-bold mb-4">TÌM KIẾM</h2>

        {/* Tỉnh/Thành phố */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tỉnh/Thành phố
          </label>
          <div className="relative">
            <select className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option>TP. Hồ Chí Minh</option>
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
            <select className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option>Quận Gò Vấp</option>
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
            <select className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option>Căn hộ/Chung cư</option>
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
            Khoảng giá
          </label>
          <div className="flex items-center">
            <input
              type="text"
              value="1500 000 ₫"
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            />
            <span className="mx-2">đến</span>
            <input
              type="text"
              value="3 000 000 ₫"
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
