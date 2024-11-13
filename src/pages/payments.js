import { useState } from "react";
import Modal from "@/components/commons/modal";
import BaseTable from "@/components/base-table";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Payments = () => {
  const [payments, setPayments] = useState([
    { id: 1, name: "Mehmet Sait Işık", currency: "₺", monthlyPayment: 1000, yearlyPayment: 12000 },
    { id: 2, name: "Köpek Cesur Işık", currency: "$", monthlyPayment: 200, yearlyPayment: 2400 },
  ]);
  const [modal, setModal] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Kullanıcı adı zorunludur"),
    currency: yup.string().required("Para birimi zorunludur"),
    monthlyPayment: yup
      .number()
      .typeError("Aylık ödeme sayı olmalıdır")
      .required("Aylık ödeme zorunludur")
      .positive("Aylık ödeme pozitif olmalıdır"),
    yearlyPayment: yup
      .number()
      .typeError("Yıllık ödeme sayı olmalıdır")
      .required("Yıllık ödeme zorunludur")
      .positive("Yıllık ödeme pozitif olmalıdır"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddPayment = (newPayment) => {
    setPayments([
      ...payments,
      {
        id: payments.length + 1,
        name: newPayment.name,
        currency: newPayment.currency,
        monthlyPayment: newPayment.monthlyPayment,
        yearlyPayment: newPayment.yearlyPayment,
      },
    ]);
    setModal(false);
    reset();
  };

  return (
    <div className="flex h-screen bg-white text-black">
      <div className="flex flex-col w-full p-10 gap-2">
        <BaseTable
          head={[
            { title: "Kullanıcı Adı" },
            { title: "Para Birimi" },
            { title: "Aylık Ödeme" },
            { title: "Yıllık Ödeme" },
          ]}
          isLoading={false}
          body={payments.map((item) => [
            item.name,
            item.currency,
            item.monthlyPayment,
            item.yearlyPayment,
          ])}
          searchable={true}
          automaticPagination={true}
          tableBtn={
            <div className="border border-black text-center p-1 rounded-lg w-20 my-2">
              <button onClick={() => setModal(true)}>Ekle</button>
            </div>
          }
        />

        {modal && (
          <Modal title="Yeni Ödeme Ekle" hideModal={() => setModal(false)}>
            <form onSubmit={handleSubmit(handleAddPayment)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="border rounded w-full p-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Para Birimi</label>
                <select
                  {...register("currency")}
                  className="border rounded w-full p-2"
                >
                  <option value="">Seçiniz</option>
                  <option value="₺">₺ - Türk Lirası</option>
                  <option value="$">$ - ABD Doları</option>
                  <option value="€">€ - Euro</option>
                </select>
                {errors.currency && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currency.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Aylık Ödeme</label>
                <input
                  type="number"
                  {...register("monthlyPayment")}
                  className="border rounded w-full p-2"
                />
                {errors.monthlyPayment && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.monthlyPayment.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Yıllık Ödeme</label>
                <input
                  type="number"
                  {...register("yearlyPayment")}
                  className="border rounded w-full p-2"
                />
                {errors.yearlyPayment && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.yearlyPayment.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-black text-white hover:bg-gray-800 p-2 rounded w-full mt-4"
              >
                Ekle
              </button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Payments;
