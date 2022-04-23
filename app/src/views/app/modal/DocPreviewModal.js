// ** React Imports
import React, { Fragment } from 'react'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap'

// ** Third Party Components
import { FileText } from 'react-feather'
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";


const DocPreviewModal = (props) => {

  // TO-DO: Create array loop function for more than one document case
  const docs = [
    { uri: `${props.docUri}` },
  ];

  return (
    <Fragment>
      <Card>
        <CardBody className='text-center'>
          <FileText className='font-large-2 mb-1' />
          <CardTitle tag='h5'>Document Preview</CardTitle>
          <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default DocPreviewModal
