import Banner from "@/src/components/home/Banner";
import PopularRecipe from "@/src/components/home/PopularRecipe";
import WhySamRecipe from "@/src/components/home/WhySamRecipe";

export default function Home() {
  return (
    <>
      <Banner></Banner>
      <PopularRecipe></PopularRecipe>
      <WhySamRecipe></WhySamRecipe>
    </>
  );
}
