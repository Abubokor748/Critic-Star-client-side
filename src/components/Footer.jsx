import React from 'react';

import websiteIcon from "../../src/assets/IconForWeb-Fav.png";

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-base-200 text-base-content p-10">
                <aside>
                    <img src={websiteIcon} className='w-28' alt="" />
                    <h2 className='font-bold text-2xl'>CriticStar</h2>
                    <p>
                        A guiding tool for customers to navigate through the best services, based on community feedback and ratings.
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a href='https://www.facebook.com/absiddique748'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </footer>
            <hr />
            <aside className="footer bg-base-200 text-base-content py-2 mb-2 justify-items-center">
                <p>Copyright © {new Date().getFullYear()} Critic Star. All rights reserved.</p>
            </aside>
        </div>
    );
};

export default Footer;