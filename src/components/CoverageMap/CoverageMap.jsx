import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import Loading from '../Loading/Loading';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const CoverageMap = () => {

    const axios = useAxios();

    const { isLoading, data: coverageAreas = [] } = useQuery({
        queryKey: ['coverageAreas'],
        queryFn: async () => {
            const res = await axios.get('/coverage');
            return res.data;
        }
    })

    console.log(coverageAreas)

    
    // console.log(coverageAreas)

    const position = [23.6850, 90.3563];

    const mapRef = useRef();

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='my-5 py-10 flex flex-col items-center gap-5  rounded-3xl'>
            <h1 className='text-center my-10 text-4xl text-secondary'>Our Service Area</h1>
            

            <div className='border border-primary rounded-md w-[50%] h-[402px] z-0'>
                <MapContainer ref={mapRef} center={position} zoom={7} scrollWheelZoom={false} className='h-[400px] rounded-md'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        coverageAreas.map(center => <Marker position={[center.latitude, center.longitude]} key={center._id}>
                            <Popup>
                                <strong>{center.district}</strong><br />
                                
                            </Popup>
                        </Marker>
                        )
                    }

                </MapContainer>
            </div>
        </div>
    );
};

export default CoverageMap;