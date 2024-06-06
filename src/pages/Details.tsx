import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonModal, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import useApi, { DetailsResult } from '../hooks/useApi';
import { bodyOutline, clipboardOutline, starHalfOutline, trophyOutline } from 'ionicons/icons';

interface DetailsPageProps extends RouteComponentProps<{ id: string }> { }

const Details: React.FC<DetailsPageProps> = ({ match }) => {

    const { getDetails } = useApi()

    const [information, setInformation] = useState<DetailsResult | null>(null)

    useIonViewWillEnter(async () => {
        const id = match.params.id
        const data = await getDetails(id)
        setInformation(data)
        console.log(data)
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/movies' />
                    </IonButtons>
                    <IonTitle>{information?.Genre}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

                {information && (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{information.Title}</IonCardTitle>
                            <IonCardSubtitle>{information.Year}</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonImg src={information.Poster} />

                            <IonItem lines='none'>
                                <IonIcon icon={starHalfOutline} slot='start' color='warning' />
                                <IonLabel>{information.imdbRating}</IonLabel>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                )}

                <IonModal trigger='open-modal' initialBreakpoint={.25} breakpoints={[0, .25, .5, .75]}>
                    <IonContent className='ion-padding'>

                        <IonItem lines='none'>
                            <IonIcon icon={clipboardOutline} slot='start' />
                            <IonLabel>{information?.Director}</IonLabel>
                        </IonItem>

                        <IonItem lines='none'>
                            <IonIcon icon={bodyOutline} slot='start' />
                            <IonLabel className='ion-text-wrap'>{information?.Actors}</IonLabel>
                        </IonItem>

                        <IonItem lines='none'>
                            <IonIcon icon={trophyOutline} slot='start' />
                            <IonLabel className='ion-text-wrap'>{information?.Awards}</IonLabel>
                        </IonItem>

                        <p className='ion-padding ion-text-justify'>{information?.Plot}</p>
                    </IonContent>
                </IonModal>

            </IonContent>

            <IonFooter>
                <IonButton expand='block' id='open-modal'>
                    Show more
                </IonButton>
            </IonFooter>
        </IonPage>
    )
}

export default Details;