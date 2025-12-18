import React from 'react';
import MyContainer from '../../components/MyContainer/MyContainer';
import Loading from '../../components/Loading/Loading';
import useRole from '../../hooks/useRole';
import AdminDash from '../../components/AdminDash/AdminDash';
import DecoratorDash from '../../components/DecoratorDash/DecoratorDash';
import UserDash from '../../components/UserDash/UserDash';

const DashHome = () => {

    const { role, roleLoading } = useRole();

    console.log(role)

    if(roleLoading){
        return <Loading></Loading>
    }

    return (
        <div className='py-5'>
            <MyContainer>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-xl md:text-2xl text-secondary text-center'>Welcome to StyleDecor Dashboard !</h1>
                    
                    {
                        role === 'admin'? <AdminDash></AdminDash> : role === 'decorator'? <DecoratorDash></DecoratorDash> : <UserDash></UserDash>
                    }
                </div>
            </MyContainer>

        </div>
    );
};

export default DashHome;