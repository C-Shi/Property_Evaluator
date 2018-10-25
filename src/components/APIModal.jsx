import React, { Component } from 'react'

const APIModal = () => {
  return(
    <div className="modal fade" id="api-usage" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Real Map API Docs</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Website and Developers are welcome to use our API. All API request will be sent in json file. Request should be sent to <a href="http://localhost:3001/api/public" target="_blank">www.real-map.example/api/public</a></p>
            <p>What you can do get with our API: </p>
            <ul>
              <li><i className="fa fa-check" aria-hidden="true"></i> Collect Search Count for All Communities within Calgary</li>
              <li><i className="fa fa-check" aria-hidden="true"></i> Use our build-in filter function to query specific type of data</li>
            </ul>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Query</th>
                  <th scope="col">How to use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>$select</td>
                  <td>To select specific row of database</td>
                </tr>
                <tr>
                  <td>$where</td>
                  <td>To filter out data by parameter</td>
                </tr>
                <tr>
                  <td>$order</td>
                  <td>To obtain data in a specific order</td>
                </tr>
              </tbody>
            </table>
            <iframe src="https://codesandbox.io/embed/vrz29w075?autoresize=1&hidenavigation=1&module=%2Fsrc%2Findex.js&view=editor" style={{width:"100%", height:"400px", border:0,  overflow:"hidden"}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Got it! <i className="fa fa-thumbs-o-up" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default APIModal;