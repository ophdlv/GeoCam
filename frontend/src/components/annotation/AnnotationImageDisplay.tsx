import { useState, useEffect } from "react";
import { Grid } from "@mui/material";

const AnnotationImageDisplay = (
    props
) => {

    const [isAnnotatedColor, setIsAnnotatedColor] = useState<string>("")

    const mediaDisplayStyle = {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        maxWidth: "99.5%",
        maxHeight: "670px",
        border: "3px solid",
        borderRadius: "5px",
        borderColor: isAnnotatedColor,
    };
    
    const displayMedia = (image) => {
        if (image.extension.includes("image")) {
            return (
                <img
                    src={ image.url }
                    alt={ image.name }
                    loading="lazy"
                    style={ mediaDisplayStyle }
                />
            )
        }
        else {
            return (
                <video
                    src={ image.url }
                    style={ mediaDisplayStyle }
                    controls
                    autoPlay={ false }
                >
                    <source 
                        type="video/mp4"
                    />
                    { image.name }
                </video>
            )
        }
    };

    useEffect(() => {
        (async () => {
            props.image?.treated
            ? setIsAnnotatedColor("green") 
            : (props.isAnnotated 
                ? setIsAnnotatedColor("orange") 
                : setIsAnnotatedColor("red"))
        })();
    }, [props.image?.annotations, props.isAnnotated]);

    return (
        <>
            <Grid item
                alignItems="center"
                justifyContent="center"
                className="boxImage"
                style={{ 
                    backgroundColor: "#D9D9D9",
                }}
            >
                {displayMedia(props.image)}
            </Grid>
        </>
    );
};

export default AnnotationImageDisplay;