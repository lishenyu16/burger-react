import React from 'react'
import styles from './Layout.module.css'
const layout = ( props ) =>{
    return(
        <main className={styles.Content}>
            {props.children}
        </main>
    )
}

export default layout

//alternative way of above, note the '(' instead of '{'
//When you use the (  (parenthesis),
//the return statement is not displayed,  but it's still active.

// const layout = ( props ) =>()
//     <Aux>
//         <div></div>
//         <main>
//             {props.children}
//         </main>
//     </Aux>
// )