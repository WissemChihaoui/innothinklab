import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import blog5 from "@/public/images/blog/blog_details-img04.jpg";
import icon7 from "@/public/images/icon/icon-left.png";
import icon8 from "@/public/images/icon/profile-circle.svg";
import icon9 from "@/public/images/icon/icon-right.png";

interface OtherDescriptionProps {
  navigation: any
}

const OtherDescription: FC<OtherDescriptionProps> = ({navigation}) => {
  return (
    <div>
      <hr className="mb-50" />
      <div className="other_post_nav ul_li_between">
        {!!navigation.prev && <Link href={`/blog/${navigation.prev.slug}`} className="post-nav-item">
          <div className="xb-item--arrow pos-rel">
            <Image src={icon7} alt="Previous Post" />
            <span></span>
          </div>
          <div className="xb-item--holder">
            <h3 className="xb-item--title">
              {navigation.prev.title}
            </h3>
           
          </div>
        </Link>}

        <Link href="/blog" className="xb-bar ">
          <i className="fas fa-th-large"></i>
        </Link>

       {!!navigation.next && <Link href={`/blog/${navigation.next.slug}`} className="post-nav-item">
          <div className="xb-item--holder">
            <h3 className="xb-item--title">
              {navigation.next.title}
            </h3>
            
          </div>
          <div className="xb-item--arrow pos-rel">
            <Image src={icon9} alt="Next Post" />
            <span></span>
          </div>
        </Link>}
      </div>

      <div className="item_details-newslatter">
        <div className="xb-item--holder ul_li_between align-items-start">
          <div className="xb-item-heading_info">
            <h3 className="item_details_info_heading">
              Abonnez-vous à nos mises à jour
            </h3>
            <p>
              Restez à jour ! Recevez tous nos ressources et nos <br />
              actualités directement dans votre boîte de réception.
            </p>
          </div>
          <span className="xb-item--bell-icon">
            <i className="fas fa-bell"></i>
          </span>
        </div>

        <div className="xb-item--item-input_field pos-rel">
          <input type="email" placeholder="innomax@example.com" />
          <button type="submit">S'abonner</button>
        </div>
      </div>
    </div>
  );
};

export default OtherDescription;
