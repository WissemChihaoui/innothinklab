import React from "react";
import Link from "next/link";
import mImg from "@/public/images/casestudy/mm_img.png";
import Image from "next/image";

const MegaMenu2 = () => {
  return (
    <ul className="submenu">
      <li>
        <div className="mega_menu_wrapper">
          <div className="container">
            <div className="mega_menu_wrapper_inner megamenu_widget_wrapper">
              <div className="row justify-content-lg-between">
                <div className="col-xl-12">
                  <div className="megamenu_widget_inner">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="megamenu_widget">
                          <ul className="icon_list unordered_list_block">
                            <li>
                              <Link href="/service/web">
                                <span className="icon_list_text">
                                  Développement Web
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/service/mobile">
                                <span className="icon_list_text">
                                  Développement Mobile
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/service/customized">
                                <span className="icon_list_text">
                                  Développement Personnalisé
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/service/seo">
                                <span className="icon_list_text">SEO</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="megamenu_widget">
                          <ul className="icon_list unordered_list_block">
                            <li>
                              <Link href="/service/marketing">
                                <span className="icon_list_text">
                                  Marketing
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/service/content">
                                <span className="icon_list_text">
                                  Création de contenu
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/service/hosting">
                                <span className="icon_list_text">
                                  Hébergement
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="social_area">
                    <div className="social_inner ul_li">
                      <span>Nous Suivre:</span>
                      <ul className="social_icons_block unordered_list">
                        {/* <li>
                                                    <Link href="/">
                                                        <i
                                                            className="fab fa-facebook-f"></i>
                                                    </Link>
                                                </li> */}
                        <li>
                          <Link href="https://www.linkedin.com/in/inno-thinklab-42b020390/">
                            <i className="fab fa-linkedin-in"></i>
                          </Link>
                        </li>
                        {/* <li>
                                                    <Link href="/">
                                                        <svg width="18" height="18"
                                                            viewBox="0 0 18 18"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M10.6774 7.62177L17.2342 0H15.6805L9.98719 6.61788L5.43998 0H0.195312L7.07159 10.0074L0.195312 18H1.74916L7.76141 11.0113L12.5636 18H17.8083L10.677 7.62177H10.6774ZM8.54921 10.0956L7.8525 9.09906L2.30903 1.16971H4.69564L9.16929 7.56895L9.866 8.56546L15.6812 16.8835H13.2946L8.54921 10.096V10.0956Z"
                                                                fill="#0C111D" />
                                                        </svg>
                                                    </Link>
                                                </li> */}
                        {/* <li>
                                                    <Link href="/">
                                                        <i className="fab fa-dribbble"></i>
                                                    </Link>
                                                </li> */}
                      </ul>
                    </div>
                    <p className="career_link m-0">
                      À la recherche d'une nouvelle carrière ?{" "}
                      <Link href="/career">Nous recrutons</Link>
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default MegaMenu2;
