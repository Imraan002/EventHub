import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { getFirestore, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import app from './FirebaseAuth'; // Import app from FirebaseAuth

const QRScanner = () => {
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResult, setScannedResult] = useState(undefined);
  const [cameraError, setCameraError] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null); // State to track verification status

  const onScanSuccess = async (result) => {
    console.log(result);
    setScannedResult(result?.data);

    // Database part
    if (result && result.data) {
      try {
        const dataParts = result.data.split(','); // Split the data string by comma
        const eventId = dataParts[0].split(': ')[1]; // Extract event ID from the first part
        const userId = dataParts[1].split(': ')[1]; // Extract user ID from the second part
        const db = getFirestore(app);
        const registrationsCollection = collection(db, 'registrations');

        // Query the registrations collection for the specific event and user ID
        const q = query(
          registrationsCollection,
          where('eventId', '==', eventId),
          where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        
        console.log(querySnapshot.size);
        if (!querySnapshot.empty) {
          // Entry found, QR code verified
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref); // Delete the entry to prevent multiple uses
          });
          setVerificationStatus(true); // Set verification status to true
        } else {
          // Entry not found, QR code invalid
          setVerificationStatus(false); // Set verification status to false
        }
      } catch (error) {
        console.error('Error scanning QR code:', error.message);
        setVerificationStatus(false); // Set verification status to false in case of error
      }
    }
  };

  const onScanFail = (err) => {
    console.log(err);
    setCameraError(true);
  };

  const handleCloseCamera = () => {
    setCameraError(false);
    setQrOn(false);
    scanner.current?.stop();
  };

  useEffect(() => {
    if (videoEl.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl.current || undefined,
      });

      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
          console.log(err);
          setCameraError(true);
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl.current) {
        scanner.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (verificationStatus !== null) {
      // Redirect to './eventlist' after 4 seconds if verification status is true
      if (verificationStatus) {
        setTimeout(() => {
          window.location.href = './eventlist';
        }, 4000);
      }
    }
  }, [verificationStatus]);

  return (
    <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
      <video
        ref={videoEl}
        style={{ width: '100%' }}
        autoPlay
        playsInline
        muted
        controls={false}
      ></video>
      <div
        ref={qrBoxEl}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
      {verificationStatus === true && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'green',
            fontSize: '24px',
          }}
        >
          Verified <span role="img" aria-label="checkmark">✅</span>
        </div>
      )}
      {verificationStatus === false && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'red',
            fontSize: '24px',
          }}
        >
          Not Verified <span role="img" aria-label="cross">❌</span>
        </div>
      )}
      {cameraError && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <button onClick={handleCloseCamera}>Close Camera</button>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
