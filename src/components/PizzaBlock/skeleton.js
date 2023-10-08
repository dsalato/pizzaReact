import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="265" rx="10" ry="10" width="280" height="20" />
        <circle cx="140" cy="120" r="120" />
        <rect x="0" y="315" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="430" rx="10" ry="10" width="95" height="30" />
        <rect x="125" y="421" rx="20" ry="20" width="155" height="45" />
    </ContentLoader>
)

export default Skeleton