import '../css/button.css'
import '../css/grid.css'

const GridButton = ({ handleClick }) => {
    const grid = [
        {id: 1, content: 'pyramide'},
        {id: 2, content: 'pylone'},
        {id: 3, content: 'elem2'},
        {id: 4, content: 'flat'},
    ];
    return (
        <div className='grid-container'>
            {grid.map((item) => (
                <button
                    key={item.id}
                    className='grid-item button'
                    onClick={() => handleClick(item.content)}
                >
                 {item.content}
                </button>
            ))}
        </div>
    );
}

export default GridButton;