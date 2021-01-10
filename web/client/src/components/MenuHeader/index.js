import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../actions'

import './style.css'

const MenuHeader = (props) => {
    const category = useSelector((state) => state.category)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategory())
    }, [dispatch])

    const renderCategories = (categories) => {
        let myCategories = []

        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.parentId ? (
                        <a
                            href={`/${category.slug}?cid=${category._id}&type=${category.type}`}
                        >
                            {category.name}
                        </a>
                    ) : (
                        <span>{category.name}</span>
                    )}

                    {category.children.length > 0 ? (
                        <ul>{renderCategories(category.children)}</ul>
                    ) : null}
                </li>
            )
        }
        return myCategories
    }

    return (
        <div className="menuHeader">
            <ul>
                {category.categories.length > 0
                    ? renderCategories(category.categories)
                    : null}
            </ul>
        </div>
    )
}

export default MenuHeader
