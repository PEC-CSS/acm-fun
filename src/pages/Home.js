import HeroSection from "../components/Home/HeroSection"
import Cards from "./home/Cards"

export const Home = () => {
    return (
        <>
            <HeroSection />
            <section id="games-section" style={{ padding: '100px 0' }}>
                <h2>Games Section</h2>
                <Cards /> 
            </section>
        </>
    )
}