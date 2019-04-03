
import React from 'react'
import styles from './BuildControls.module.css'
import BuildControl from './BuildCongrol/BuildControl'

const controls = [
    {label:'Salad', type: 'salad'},
    {label:'Meat', type: 'meat'},
    {label:'Cheese', type: 'cheese'},
    {label:'Bacon', type: 'bacon'}
]


const buildControl = (props)=>{
    return (
        <div className={styles.BuildControls}>
            <p>Burger Price: <b>{props.price.toFixed('2')}</b></p>
            {
                controls.map(ctrl=>(
                    <BuildControl 
                        disabled={props.disabled[ctrl.type]}
                        key={ctrl.label} 
                        label={ctrl.label} 
                        ingredientAdded={()=>props.ingredientAdded(ctrl.type)} 
                        ingredientRemoved={()=>props.ingredientRemoved(ctrl.type)} 
                    />
                ))
            }
            <button 
                onClick={props.clickPurchase}
                className={styles.OrderButton} 
                disabled={props.price==4?true:false}>
                Order Now
            </button>
        </div>
    )
}

export default buildControl