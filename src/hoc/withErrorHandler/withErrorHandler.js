import React from 'react';
import Modal from '../../component/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrapperComponent, axios) => {
    return props => {
        const [error , clearError ] = useHttpErrorHandler(axios);
        return (
            <Auxiliary>
                <Modal show={error} modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrapperComponent {...props} />
            </Auxiliary>
        );
    }
}
export default withErrorHandler;