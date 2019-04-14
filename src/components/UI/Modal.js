import React,{Component} from 'react'
import styles from './Modal.module.css'
import Backdrop from './Backdrop'

// const modal = (props)=>(
//     <React.Fragment>
//         <Backdrop show={props.show} clickBackdrop={props.modalClosed}></Backdrop>
//         <div 
//             className={styles.Modal}
//             style={{transform:props.show?'translateY(0)':'translateY(-100vh)', opacity:props.show? '1':'0'}}>
//             {props.children}
//         </div>
//     </React.Fragment>
// )

class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show!==this.props.show || nextProps.children !== this.props.children
    }
    render(){
        console.log('modal is showing now ')
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clickBackdrop={this.props.modalClosed}></Backdrop>
                <div 
                    className={styles.Modal}
                    style={{transform:this.props.show?'translateY(0)':'translateY(-100vh)', opacity:this.props.show? '1':'0'}}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal

