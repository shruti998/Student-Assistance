import React from 'react';
import mottoImg from '../../../assets/motto.jpg'
import './motto.scss'
import MottoText from './mottotext'
export default function Motto(){

       return ( 
            <div className='ContainerProp'>
            <div >
                <img src={mottoImg} className='roommatesImage' alt='motto'/>
            </div>
            <div className='mottoText'>
               <MottoText />
            </div>
            <div>
                <a href='/register'>
                <button className='LearnMoreButton'>Learn More</button>
                </a>
            </div>
            </div>
         );
    
}
 
