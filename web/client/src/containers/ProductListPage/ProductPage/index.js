import React, { useEffect } from 'react'
import { getProductPage } from '../../../actions'
import { useDispatch, useSelector } from 'react-redux'
import getParams from '../../../utils/getParams'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import Card from '../../../components/UI/Card'

const ProductPage = (props) => {
    const dispatch = useDispatch()
    const product = useSelector((state) => state.product)
    const { page } = product

    useEffect(() => {
        const params = getParams(props.location.search)
        //console.log({ params })
        const payload = {
            params,
        }

        dispatch(getProductPage(payload))
        //console.log(payload)
    }, [])

    return (
        <div style={{ margin: '0 10px' }}>
            <h3>{page.title}</h3>
            <Carousel renderThumbs={() => {}} showArrows={true}>
                {page.banners &&
                    page.banners.map((banner, index) => (
                        <a
                            key={index}
                            style={{ display: 'block' }}
                            href={banner.navigateTo}
                        >
                            <img
                                src={banner.img}
                                alt=""
                                style={{ maxHeight: '300px' }}
                            />
                        </a>
                    ))}
            </Carousel>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'flex',
                }}
            >
                {page.products &&
                    page.products.map((product, index) => (
                        <Card
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '400px',
                                height: '200px',
                                margin: '10px 5px',
                            }}
                        >
                            <img
                                src={product.img}
                                alt=""
                                style={{
                                    width: '400px',
                                    height: '200px',
                                    margin: '0 5px',
                                    objectFit: 'contain',
                                }}
                            />
                        </Card>
                    ))}
            </div>
        </div>
    )
}

export default ProductPage
