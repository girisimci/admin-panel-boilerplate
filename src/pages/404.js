import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-white">
      <h1 className="text-9xl font-bold text-gray-600">404</h1>
      <h2 className="text-3xl text-black font-semibold mt-4">Sayfa Bulunamadı</h2>
      <p className="text-gray-400 mt-2 text-center max-w-md">
        Aradığınız sayfa mevcut değil veya kaldırılmış olabilir. Lütfen adresi
        kontrol edin veya anasayfaya geri dönün.
      </p>
      <Link href="/" passHref>
        <button className="mt-6 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-md transition">
          Anasayfaya Dön
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
