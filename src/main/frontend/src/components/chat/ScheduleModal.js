/**
 * @author hyunseul
 * @create date 2023-10-11 17:59:15
 * @modify date 2023-10-11 18:46:37
 */

import React from 'react';

function Modal(props) {
 
    function closeModal() {
        props.closeModal();
      }
     
      return (
        <div className="Modal" onClick={closeModal}>
          <div className="modalBody" onClick={(e) => e.stopPropagation()}>
            <button id="modalCloseBtn" onClick={closeModal}>
              ✖
            </button>
            {props.children}
          </div>
        </div>
      );
    }

export default ScheduleModal;