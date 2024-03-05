import React, { useEffect, useState } from 'react'
import './InterviewsUser.css'
import SideBarUser from './../Components/SideBarUser';
import Tabla from './../../DashBoard/Components/Tabla';
import { useInterview } from '../../../contexts/InterviewContext';
import { useAuth } from '../../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardQuestion, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function InterviewsUser() {

    const { _getInterviewUser } = useInterview();
    const [interviews, setInterviews] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const loadData = async () => {
            const res = await _getInterviewUser(user._id || user.id);
            setInterviews(res);
            console.log(res);
        }
        loadData();
    }, []);
    return (
        <div className='prof-cont'>
            <SideBarUser />
            <Tabla list={interviews} isButtonNew={false}>
                {(results) => (
                    <>
                        <thead className='bg-morado2 txt-white'>
                            <tr>
                                <th>Mascota</th>
                                <th>Entrevistador</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody className='container-body_table'>
                            {results.map(interview => (
                                <tr key={interview._id}>
                                    <td>{interview.animal}</td>
                                    <td>{interview.user}</td>
                                    <td>{new Date(interview.date).toLocaleString()}</td>
                                    <td>{interview.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                )}
            </Tabla>
        </div>
    )
}

export default InterviewsUser