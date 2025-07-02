import { CarwashData } from "@/lib/types/carwash";
import { useState } from "react";

export const CarwashGallery: React.FC<{ carwashData: CarwashData }> = ({ carwashData }) => {
    const [imageIdx, setImageIdx] = useState(0);

    const images = carwashData.data.media;

    return (
        <div className="lg:flex-1">
            {images.length > 0 && (
                <>
                    <div className="aspect-[4/3] rounded-xl overflow-clip mb-2 md:mb-3">
                        <img src={images[imageIdx]} alt="Фото автомойки" className="size-full object-cover object-center" />
                    </div>
                    <div className="flex items-center overflow-x-auto gap-2 md:gap-3 scrollbar-hidden">
                        {images.map((img, idx) => (
                            <button key={`media-${idx}`} onClick={() => setImageIdx(idx)} className="rounded-xl block cursor-pointer shrink-0 aspect-[4/3] overflow-clip" style={{ width: 'calc((100% - 0.5rem) / 3)' }}>
                                <img src={img} alt="Фото автомойки" className="size-full object-cover object-center" />
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
