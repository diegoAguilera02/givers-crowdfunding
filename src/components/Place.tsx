/* eslint-disable no-unsafe-optional-chaining */
import { useRef } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { TextInput } from "@mantine/core";


interface Props {
    updateAddress: (address: string, lat: string, lng: string) => void;
}

const GooglePlace = ({ updateAddress }: Props) => {
    const inputRef = useRef<google.maps.places.SearchBox | null>(null);

    const handlePlaceChanged = () => {
        const [place] = inputRef.current?.getPlaces();

        if (place) {
            // console.log(place.formatted_address);
            // console.log(place.geometry?.location.lat());
            // console.log(place.geometry?.location.lng());

            updateAddress(place.formatted_address,
                place.geometry?.location.lat().toString(),
                place.geometry?.location.lng().toString());
        }

    }
    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={["places"]}
        >
            <StandaloneSearchBox
                onLoad={(ref) => (inputRef.current = ref)}
                onPlacesChanged={handlePlaceChanged}
            >
                <TextInput label="Dirección" placeholder="Av condell, Antofagasta, Chile" />
            </StandaloneSearchBox>
        </LoadScript>
    )
}

export default GooglePlace;