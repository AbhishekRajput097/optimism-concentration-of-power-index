import React from 'react';
import Image from 'next/image';
import hero1 from "@/public/assets/images/hero1-1.png";


const HeaderImage = () => {
    return (
        <div className="absolute z-20 top-0 right-0 w-[40%] md:w-[40%] flex justify-end items-center">
            <Image
                src={'/assets/images/test.png'}
                // fill={true}
                width={455}
                height={421}
                alt="Hero background"
                quality={100}
                className=''
                priority={true}
                placeholder='empty'
            // placeholder="blur"
            // blurDataURL="data:image/webp;base64,UklGRpYCAABXRUJQVlA4WAoAAAAgAAAALgAALgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggqAAAAFAHAJ0BKi8ALwA+7WquTimmpKIquqwBMB2JYgCl36GMAAz49TW1cpYOMruddXzjEC/MWYZNu7fyRPQBZLJFJH88EsAA/u6e3Lk0qrnJaIh5MfyIH5GBdFjecEcW239w1P2GuiCKev2QYbWXrPymer3QHwZnKXEOx8VmWX8GlV4BEw02siHz2wKv309QCWRDKrmz7wbZQjCI1lVkjQyurMSkmRAs7AAAAA=="
            />
        </div>
    );
};

export default HeaderImage;