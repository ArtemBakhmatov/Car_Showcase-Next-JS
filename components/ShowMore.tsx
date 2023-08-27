"use client";

import { useRouter } from "next/navigation";

import { ShowMoreProps } from "@/types";
import { updateSearchParams } from "@/utils";
import CustomButton from "./CustomButton";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
    const router = useRouter();

    const handleNavigation = () => {
        // Рассчитать новый лимит на основе номера страницы и типа навигации
        const newLimit = (pageNumber + 1) * 10;
        // Обновить параметр поиска "limit" в URL-адресе новым значением
        const newPathname = updateSearchParams("limit", `${ newLimit }`);
        
        router.push(newPathname);
};

    return (
        <div className="w-full flex-center gap-5 mt-10">
            { !isNext && (
                <CustomButton
                    btnType="button"
                    title="Show More"
                    containerStyles="bg-primary-blue rounded-full text-white"
                    handleClick={handleNavigation}
                />
            )}
        </div>
    );
};

export default ShowMore;