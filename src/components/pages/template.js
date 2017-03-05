import React, { PropTypes } from 'react';
import style from 'styles/template.scss';
import windowOpen from 'helpers/safe-open-in-new-window';

function onClick(e) {
  e.preventDefault();
  const elm = e.currentTarget;
  windowOpen(elm.href);
}

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
        Star Wars icons by <a onClick={onClick} href="https://dribbble.com/shots/2383021-Star-Wars-Icons-Freebie">Justas Galaburda</a>,
        font by <a onClick={onClick} href="http://www.dafont.com/shyfonts.d11">Shyfonts</a>,
        <br/> stars by <a onClick={onClick} href="http://getemoji.com/">GetEmoji</a> & 
        made with <span className={style.heart} dangerouslySetInnerHTML={{__html: '&hearts;' }}></span> by <a onClick={onClick} href="https://cedmax.com/">cedmax</a>.
      </footer>
    </div>
  );
}

Template.propTypes = {
  children: PropTypes.node.isRequired
};