import React from 'react';
import MyContainer from '../MyContainer/MyContainer';

const NewsLatter = () => {
    return (
        <div>
            <MyContainer>
                <div className='mt-5 mb-20 flex flex-col items-center gap-5 px-20'>
                    <h1 className='text-center my-10 text-4xl text-secondary'>Subscribe to Our News Letter</h1>

                    {/* <p className='text-base md:text-xl w-full text-center'>For any kind of queries, feel free to contact us.</p> */}

                    <form className='w-full'>

                        <div className='flex flex-col items-center my-5 gap-5'>

                            <div className='w-full md:w-1/2'>

                                <fieldset className="fieldset flex flex-col gap-5">
                                    <div className='flex gap-3'>
                                        {/* name */}

                                        <input type="text" required className="input w-full rounded-4xl p-3" placeholder="Name" />
                                        {/* email*/}

                                        <input type="email" required className="input w-full rounded-4xl p-3" placeholder=" Email" />
                                    </div>

                                </fieldset>
                                <button className='btn btn-primary text-secondary shadow-none rounded-4xl h-[35px] w-full my-5'>Subscribe</button>
                            </div>

                        </div>

                    </form>
                </div>
            </MyContainer>
        </div>
    );
};

export default NewsLatter;