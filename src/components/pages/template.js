import React from 'react';
import style from 'styles/template.scss';

export default function Template(props) {  
  return (
    <div className={ style.block }>
      <header className={ style.header }>
        <h1>obey, kids</h1>
        <h2>some sort of Star Wars</h2>
      </header>
      <div className={ style.main }>{ props.children }</div>
      <footer className={ style.footer }>
        Star Wars is a Disney intellectual property.<br/>
        Star Wars icons designed by <a href="https://dribbble.com/shots/2383021-Star-Wars-Icons-Freebie">Justas Galaburda</a>.<br/>
        Star svg are from <a href="http://getemoji.com/">GetEmoji</a>.
      </footer>
    </div>
  );
}