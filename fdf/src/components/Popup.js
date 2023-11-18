import '../css/Popup.css';
import ImageScrollList from './ImageScrollList';
import AddMap from './AddMap';

const Popup = ({popupVisible, handleClick}) => {
    return (
        <div className={`popup ${popupVisible ? 'visible' : ''}`}>  
            <ImageScrollList handleClick={handleClick} />
        </div>
    );
};

export default Popup;