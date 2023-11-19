import '../css/NavBar.css';
import ImageScrollList from './ImageScrollList';
import AddMap from './AddMap';

const NavBar = ({navBarVisible, handleClick}) => {
    return (
        <div className={`navbar ${navBarVisible ? 'visible' : ''}`}>  
            <ImageScrollList handleClick={handleClick} />
        </div>
    );
};

export default NavBar;