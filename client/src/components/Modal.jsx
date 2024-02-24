import { createPortal } from "react-dom";
import "./modal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({
    show,
    close,
    title = 'Alerta',
    children,
    showHeader,
    showOverlay,
    align,
    iClose,
    size }) => {
    return (
        <>
            {
                show && createPortal(
                    <div className={`modalContainer ${!showOverlay && "noOverlay"} ${align}`} onClick={iClose ? () => close() : undefined}>
                        <div className={`modal bg-white ${size}`} onClick={(e) => e.stopPropagation()}>
                            {showHeader &&
                                <header className="modal_header">
                                    <h3 className="modal_header-title txt-blue"> {title} </h3>
                                </header>
                            }
                            {iClose && <button className="close txt-blue" onClick={() => close()}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>}
                            <main> {children} </main>
                        </div>
                    </div >,
                    document.getElementById("modal")
                )
            }
        </>
    );
}
export default Modal;