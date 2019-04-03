import React from 'react'
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger = ( props ) => {

    let transformedIngredients = [];
    Object.keys(props.ingredients)
    .forEach(
        item => {
            for (let i = 0; i < props.ingredients[item]; i++) {
                transformedIngredients.push(
                    <BurgerIngredient key={item + i} type={item} />
                );
            }
        }
    );

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    )
}

export default burger;