import React from 'react';
import { Link } from 'react-router';

const Faq = () => {
    return (
        <div className='py-30 flex flex-col items-center gap-5 bg-white'>
            <div className="text-center mb-12">
                <h2 className='text-center my-10 text-4xl text-secondary'>Frequently Asked Questions (FAQ)</h2>
            </div>

            <div className='w-[80%] flex flex-col gap-3'>
                <div className="collapse collapse-arrow bg-[#ffefdc] border border-base-300">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title font-semibold">How do I create an account?</div>
                    <div className="collapse-content text-sm">Click the "Log in" button in the top right corner and click on 'register' and follow the registration process.</div>
                </div>
                <div className="collapse collapse-arrow bg-[#ffefdc] border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
                    <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
                </div>
                <div className="collapse collapse-arrow bg-[#ffefdc] border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">How do I update my profile information?</div>
                    <div className="collapse-content text-sm">Go to "My Profile" in dashboard and select "Edit Profile" to make changes.</div>
                </div>
                <div className="collapse collapse-arrow bg-[#ffefdc] border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">Is it free to create an account?</div>
                    <div className="collapse-content text-sm">Yes, anyone can register on TechDesk for free to explore available tasks or post new job requirements.</div>
                </div>
            </div>
            <Link className='btn btn-primary text-secondary shadow-none rounded-4xl h-[35px]'>See More FAQs</Link>
        </div>
    );
};

export default Faq;