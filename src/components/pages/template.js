import React, { PropTypes } from 'react';
import style from 'styles/template.scss';

export default function Template(props) {  
  return (
    <div className={ style.block }>
      <header className={ style.header }>
        <h1>obey, kids</h1>
        <h2>some sort of <img className={ style.icon } src="assets/svg/normal-star.svg" alt="star" /> Wars</h2>
      </header>
      <div className={ style.main }>{ props.children }</div>
      <footer className={ style.footer }>
        Star Wars is a Disney intellectual property.<br/>
        Star Wars icons by <a href="https://dribbble.com/shots/2383021-Star-Wars-Icons-Freebie">Justas Galaburda</a>,
        font by <a href="http://www.dafont.com/shyfonts.d11">Shyfonts</a>,
        <br/> stars by <a href="http://getemoji.com/">GetEmoji</a> & 
        made with <span className={style.heart}>♥</span> by <a href="https://cedmax.com/">cedmax</a>.
      </footer>
    </div>
  );
}

Template.propTypes = {
  children: PropTypes.node.isRequired
};