import '../css/Popup.css';

const Popup = ({popupVisible}) => {
    return (
        <div className={`popup ${popupVisible ? 'visible' : ''}`} /* style={props} */>
            <p>content</p>
        </div>
    );
}

export default Popup;