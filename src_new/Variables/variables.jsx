export const profileImage = "/images/pp.png"

export const options = [
    {
        value: "cash",
        label: (
            <div className="flex gap-2 items-center">
                <img
                    loading="lazy"
                    className="w-[40px]"
                    src="/cash-on-delivery.png"
                />
                الدفع عند الاستلام
            </div>
        ),
    },
    {
        value: "card",
        label: (
            <div className="flex gap-2 items-center opacity-50">
                <img
                    loading="lazy"
                    className="w-[40px]"
                    src="/visa.png"
                />
                <img
                    loading="lazy"
                    className="w-[40px]"
                    src="/money.png"
                />
                الدفع بالفيزا
            </div>
        ),
    },
    {
        value: "instapay-ewallet",
        label: (
            <div className="flex gap-2 items-center">
                <img loading="lazy"
                    className="w-[35px]"
                    src="/ewallet.png"
                />
                <img loading="lazy"
                    src="/Asset-6@4x-1024x125.png"
                    className="p-1 bg-indigo-500 w-[80px]"
                />
                الدفع انستاباي او محفظة الكترونية
            </div>
        ),
    },
];