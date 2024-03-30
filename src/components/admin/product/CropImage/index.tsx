import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Cropper, { Area } from 'react-easy-crop'
import Rotate90DegreesCwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCwOutlined';
import FlipCameraAndroidOutlinedIcon from '@mui/icons-material/FlipCameraAndroidOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import ZoomOutOutlinedIcon from '@mui/icons-material/ZoomOutOutlined';
import { getCroppedImg } from '@/utils/canvas';


interface ImageItem {
  url: string
  index: number
  src: string
}

const CROP_AREA_ASPECT = 3 / 2;

const Output = ({ croppedArea, url }: { croppedArea: any, url: string }) => {
  const scale = 100 / croppedArea.width;
  const transform = {
    x: `${-croppedArea.x * scale}%`,
    y: `${-croppedArea.y * scale}%`,
    scale,
    width: "calc(100% + 0.5px)",
    height: "auto"
  };

  const imageStyle = {
    transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
    width: transform.width,
    height: transform.height
  };

  return (
    <div
      className="output"
      style={{ paddingBottom: `${100 / CROP_AREA_ASPECT}%` }}
    >
      <img src={url} alt="" style={imageStyle} />
    </div>
  );
};

const CropImage = ({ idName, setValue, nameValueSet }: any) => {
  console.log(idName, "idName")
  // 
  const [listImages, setListImages] = useState<ImageItem[]>([])
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [aspect, setAspect] = useState(1)


  useEffect(() => {
    if (setValue) {
      setValue(nameValueSet, listImages)
    }
  }, [listImages])

  // Crop
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)

  const [zoom, setZoom] = useState(1)

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const boxRef = useRef()
  const [croppedImage, setCroppedImage] = useState(null)
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const showCroppedImage = useCallback(async () => {
    if (selectedImage?.url) {
      try {
        const croppedImage: any = await getCroppedImg(
          selectedImage?.url,
          croppedAreaPixels,
          rotation,
          { horizontal: rotationX == 180 ? true : false, vertical: rotationY == 180 ? true : false }
        )
        const cropImageURL = URL.createObjectURL(croppedImage)
        let imageFind = listImages.findIndex((image) => image.index == selectedImage.index)
        const imageClone = { ...selectedImage }
        imageClone.src = croppedImage
        imageClone.url = cropImageURL
        listImages[imageFind] = imageClone
        setListImages([...listImages])
        setSelectedImage({ ...imageClone })
        handleDialogClose()
      } catch (e) {
        console.error(e)
      }
    }
  }, [selectedImage?.url, croppedAreaPixels, rotation, rotationX, rotationY])

  const handleFileChange = (event: any) => {
    const files = event.target.files;

    // Filter only PNG, JPEG, and JPG files
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const allowedFiles = Array.from(files).filter((file: any) =>
      allowedFileTypes.includes(file?.type)
    );

    // Check file size (1MB = 1024 * 1024 bytes)
    const maxSizeInBytes = 1024 * 1024;
    const oversizedFiles = allowedFiles.filter((file: any) => file?.size > maxSizeInBytes);

    if (oversizedFiles.length > 0) {
      // Handle oversized files (you can display a message or perform other actions)
    }

    const remainingSlots = 9 - listImages.length;
    const filesToAdd = allowedFiles.filter((file) => !oversizedFiles.includes(file)).slice(0, remainingSlots);

    const updatedListImages: any = []
    filesToAdd.forEach((file: any, index) => {
      updatedListImages.push({
        index: index + listImages.length,
        url: URL.createObjectURL(file),
        src: file
      })
    });

    setListImages([...listImages, ...updatedListImages]);

  }

  const handleDelete = async (index: number) => {
    const updatedListImages: ImageItem[] = listImages.filter(
      (item: ImageItem) => item.index !== index
    );

    setListImages(updatedListImages);
  }

  // DIALOg
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCrop({ x: 0, y: 0 })
    setRotation(0)
    setRotationX(0)
    setRotationY(0)
    setCroppedImage(null)
    setCroppedArea(null)
  };

  const handleEditDialogOpen = (image: ImageItem) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };


  const checkLengthImages = listImages?.length < 9 || listImages.length == 0


  return (
    <>
      <Grid container spacing={2}>
        {
          listImages?.map((image: ImageItem, index: number) => (
            <Grid item xs={12 / listImages?.length} key={index} sx={{
              height: 'fit-content',
            }}>
              <Box sx={{
                '&:hover': {
                  [`.overlay-${index}`]: {
                    opacity: 1,
                    bottom: '0px'
                  }
                },
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                width: 'fit-content'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={image?.url}  // Use createObjectURL to display the image
                    style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                    alt=''
                  />
                </Box>
                <Stack justifyContent={'space-between'} direction={'row'} className={`overlay-${index}`} sx={{
                  transition: 'all 0.2s',
                  opacity: 0,
                  backgroundColor: 'rgb(171 171 171 / 77%)',
                  position: 'absolute',
                  bottom: '-25px',
                  width: '100%'

                }}>
                  <EditIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => { handleEditDialogOpen(image) }} />
                  <DeleteIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => { handleDelete(image?.index) }} />
                </Stack>
              </Box>
            </Grid>
          ))
        }


      </Grid>
      <Box sx={{ textAlign: 'center', mt: 1 }}>
        {checkLengthImages && <Box sx={{ width: '100%' }}>
          <Button
            component="label"
            sx={{ width: '100%' }}
            variant="contained"
            startIcon={<CloudUploadIcon />}
            htmlFor={`fileInput-${idName || idName == 0 ? idName : ''}`}  // Associate the button with the file input
          >
            <input
              type="file"
              accept=".jpg, .jpeg"
              hidden
              onChange={handleFileChange}
              id={`fileInput-${idName || idName == 0 ? idName : ''}`}
              multiple  // Allow multiple file selection
            />
            Upload ảnh {`(${listImages?.length}/9)`}
          </Button>
        </Box>
        }
      </Box>

      {dialogOpen && <Dialog open={dialogOpen} onClose={handleDialogClose}
        sx={{
          '& .MuiPaper-root': {
            maxWidth: '800px',
            width: '800px'
          }
        }}>
        <DialogTitle>Chỉnh sửa ảnh</DialogTitle>
        <DialogContent
        >
          <Box>
            <Box
              ref={boxRef}
              sx={{ height: '400px' }}
            >
              <Stack
                direction={'row'}
                sx={{ height: '100%' }}
                spacing={3}
              >
                <Box position={'relative'} sx={{ width: '400px', height: '100%' }}>
                  {selectedImage && (
                    <Cropper
                      image={selectedImage && selectedImage?.url}
                      crop={crop}
                      rotation={rotation}
                      zoom={zoom}
                      aspect={3 / 2}
                      onCropChange={setCrop}
                      onCropAreaChange={setCroppedArea}

                      onRotationChange={setRotation}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      transform={`translate(${crop.x}px, ${crop.y}px) rotateZ(${rotation}deg) rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(${zoom})`}
                    />
                  )}
                </Box>

                <Box >
                  {/* {croppedImage && <img src={croppedImage} style={{ width: '200px', height: '200px' }} alt='' />} */}
                  <div className="cropper">
                    <div className="viewer">
                      <div>{croppedArea && <Output croppedArea={croppedArea} url={selectedImage?.url ? selectedImage?.url : ''} />}</div>
                    </div>

                  </div>
                </Box>
              </Stack>

            </Box>
            <Stack direction={'row'} spacing={2} >
              <ZoomInOutlinedIcon onClick={() => { setZoom(zoom + 0.1) }} />
              <ZoomOutOutlinedIcon onClick={() => { setZoom(zoom - 0.1) }} />
              <Rotate90DegreesCwOutlinedIcon onClick={() => { setRotation(rotation + 90) }} />
              <AutorenewOutlinedIcon
                onClick={() => {
                  if (rotationY == 0) {
                    setRotationY(180)
                  } else {
                    setRotationY(0)
                  }
                }}
              />
              <FlipCameraAndroidOutlinedIcon onClick={() => {
                if (rotationX == 0) {
                  setRotationX(180)
                } else {
                  setRotationX(0)
                }
              }}
              />

              {/* <BsFillCloudDownloadFill className={'icon'} onClick={download} /> */}
            </Stack>
          </Box>
        </DialogContent >
        <DialogActions>
          <Button onClick={handleDialogClose}>Hủy bỏ</Button>
          <Button onClick={() => {
            showCroppedImage()
          }}>Lưu</Button>
        </DialogActions>
      </Dialog >}
    </>

  )
}

export default CropImage