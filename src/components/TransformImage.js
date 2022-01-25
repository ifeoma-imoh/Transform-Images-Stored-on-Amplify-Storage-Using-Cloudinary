import { useState } from "react";

import { Cloudinary } from "@cloudinary/url-gen";
import {
  Effect,
  RoundCorners,
  Rotate,
  Resize,
  Overlay,
} from "@cloudinary/url-gen/actions";

import { Position, Source } from "@cloudinary/url-gen/qualifiers";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import Transformation from "@cloudinary/url-gen/backwards/transformation";

const myCld = new Cloudinary({
  cloud: {
    cloudName: "ifeomaimoh",
    apiKey: "947852631359963",
  },
});

const TransformImage = ({ imageKey }) => {
  const [URL, setURL] = useState("");
  const getURLofS3Object = (tag) => {
    const S3BucketName = "mystoragebucket223448-dev";
    return `https://${S3BucketName}.s3.amazonaws.com/${tag}`;
  };

  const getImage = async () => {
    const objectURL = getURLofS3Object(`public/${imageKey}`);

    let image = myCld.image(objectURL).setDeliveryType("fetch");

    image
      .resize(Resize.fill().width(340))
      .effect(Effect.artisticFilter("frost"))
      .roundCorners(RoundCorners.byRadius().radius(40))
      .rotate(Rotate.byAngle(20))
      .overlay(
        Overlay.source(
          Source.text(
            imageKey.replace(/\.\w+$/, ""),
            new TextStyle("Cookie", 50).fontWeight(800)
          )
            .textColor("#0C0C14")
            .transformation(
              new Transformation().effect(Effect.shadow(4).color("#FFCC43"))
            )
        ).position(new Position().offsetY("160").offsetX("20"))
      );

    setURL(image.toURL());
  };
  return (
    <>
      <button onClick={getImage} className="btn-blue">
        transform image
      </button>
      {URL && <img src={URL} alt="some_random_img" />}
    </>
  );
};

export default TransformImage;
