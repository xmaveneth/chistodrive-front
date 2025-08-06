import { useState } from "react";
import  { Image }

type LazyImageProps = {
   parentClass?: string;
    imgClass?: string;
    img: 
}

export default function LazyImage ({}: LazyImageProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <Link to={`/carwash/${service.car_wash_id}`} className="block overflow-clip relative aspect-[1.55/1] rounded-lg mb-1">
                <img
                    onLoad={() => setIsImageLoading(false)}
                    src={imgPath}
                    alt="Изображение автомойки"
                    className={cn(
                        'object-center object-cover w-full h-full',
                        isImageLoading && 'opacity-0'
                    )}
                />
                {isImageLoading && (
                    <div className="inset-0 absolute z-10 flex items-center justify-center">
                        <span className="card-loader"></span>
                    </div>
                )}
            </Link>
    )
}
