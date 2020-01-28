import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectDetail } from '../../../api/_api'

import '../../../styles/ProjectDetail.scss'

export default function ProjectDetail() {
  let { id } = useParams();

  const [projectDetail, setProjectDetail] = useState(null)
  const [trabajosUrls, setTrabajosUrls] = useState([])
  const [bottomStickPosition, setBottomStickPosition] = useState(false)

  let stickyElement = useRef(null)

  useEffect(() => {
    
    getProjectDetail(id).then((project) => {
      
      setProjectDetail(project)
      setTrabajosUrls(project.trabajosUrls)
      if (stickyElement.current) {
  
        const totalSpace = document.body.clientHeight - (document.body.clientHeight * 0.1)
  
        if (stickyElement.current.clientHeight > totalSpace) {
          setBottomStickPosition(true)
        }
  
      }
    })
    
  }, [id])

  return (
    <div className='container-fluid project-detail-container'>
      {
        projectDetail !== null ?

          <div className='row justify-content-center mt-5'>
            <div className='col-xl-11'>

              <div className='row justify-content-between mb-5'>
                <div className='col-12 col-md-6'>
                  <h2 className='negrita title'>{projectDetail.name}</h2>
                </div>
                <div className='col-12 col-md-6 text-left'>
                  <h3 className='subtitle negrita'>{projectDetail.shortDescription}</h3>
                </div>
              </div>

              <div className='row mb-5'>
                <div className='col-12 text-center'>
                  {
                    projectDetail.coverVideo ?
                      <iframe id='cover-video' title='cover-video' src={ projectDetail.coverVideo} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> :
                      <img src={projectDetail.coverPhoto} alt='Cover Project' className='img-fluid' />
                  }

                </div>
              </div>

              <div className='row my-3'>

                <div className={`col-12 col-md-6 ${bottomStickPosition ? 'bottom-stick-container': 'top-stick-container'}`}>
                  <div className={`position-sticky font-medium mt-auto ${bottomStickPosition ? 'bottom-stick': 'top-stick'}`} ref={stickyElement}>
                    {
                      projectDetail.descriptionPharagraphs.map((p, i) => (
                        <p key={i} className={`description-p ${i === 0 ? 'pt-3': ''}`}>{p}</p>
                      ))
                    }
                    <p className='description-p'><span className='negrita grey'>Cliente: </span>{projectDetail.client}</p>
                    <p className='description-p'><span className='negrita grey'>Sector: </span>{projectDetail.sector}</p>
                    <p className='description-p'><span className='negrita grey'>Tipo de Proyecto: </span>{projectDetail.tags}</p>
                    <p className='description-p'><span className='negrita grey'>Mes/Año: </span>{projectDetail.date}</p>
                  </div>
                </div>

                <div className='col-12 col-md-6'>
                  <div className='row'>
                    {
                      trabajosUrls.map((trabajo, index) => (
                        <div key={index} className='col-12 mt-4'>
                          <img className='img-fluid' src={trabajo.lowRes} alt={`Projecto ${index}`} />
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div> : <></>
      }
    </div>
  )
}