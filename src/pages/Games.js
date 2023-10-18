import {games} from "../data/content.js"

export const Games = () => {
    return (
        <div>
            <div>Games</div>
            <div>
                {
                    games.map(game => {
                        return (
                            <div>
                                {game.title}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}