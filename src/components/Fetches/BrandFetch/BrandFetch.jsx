import React, { useState, useEffect } from 'react';
import '../../SideMenu/SideMenu.scss';
import { Link } from 'react-router-dom';

export default function BrandFetch(props) {
    const [apiData, setApiData] = useState(null);

    async function getCategory() {
        const fetchHeaders = new Headers();
        fetchHeaders.append('Accept', 'application/json');
        try {
            const request = await fetch('https://api.mediehuset.net/stringsonline/brands', { headers: fetchHeaders });
            const response = await request.json();
            setApiData(response.items);
        } catch (error) {
            console.log('getCategory -> Error', error);
        }
    }

    useEffect(() => {
        getCategory()
    }, [])

    // Return mapper igennem subgroups i productgroups array, kreerer links ud fra disse, der fører til de specifikke elementers ID (fetcher deres info ud fra deres ID)

    return (

        <div>
                {
                    apiData && apiData.length > 0 && apiData.map((item, i) =>

                        <section className="extra-push" key={item.id}>
                            <Link to={`/product/${item.id}`}>
                                <ul><li>{item.title}</li></ul>
                            </Link>
                        </section>
                    )
                }
        </div>

    )
}