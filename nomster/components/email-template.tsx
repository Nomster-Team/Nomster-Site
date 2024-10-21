import React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName }) => {
  return (
    <div>
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        border={0}
        style={{
          background: 'linear-gradient(to right, #FED8DF, #BFDBFE)',
          padding: '40px 0',
          minHeight: '800px',
        }}
      >
        <tr>
          <td align="center">
            <div
              style={{
                width: '600px',
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                margin: '0 auto',
              }}
            >
              <table
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                border={0}
              >
                <tr>
                  <td align="center" style={{ paddingBottom: '16px' }}>
                    <div
                      style={{
                        width: '187.5px',
                        height: '150px',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={"https://i.ibb.co/D5YFWYm/svgviewer-png-output.png"}
                        alt={"Nomster Logo"}
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                        }}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style={{ paddingBottom: '20px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#F3BAC5', margin: '0' }}>
                      Hi, <span style={{ color: '#F48FB1' }}>{firstName}!</span>
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td align="center" style={{ fontSize: '16px', color: '#333', padding: '0 20px' }}>
                    <p style={{ margin: '0 0 16px 0', fontWeight: 300 }}>
                      Thank you for signing up for Nomster! We're excited to have you on this journey with us.
                    </p>
                    <p style={{ margin: '0 0 16px 0', fontWeight: 300 }}>
                      Stay tuned for updates, and we can’t wait to share more with you soon!
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    align="left"
                    style={{
                      paddingTop: '20px',
                      textAlign: 'left',
                    }}
                  >
                    <h1
                      style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#F3BAC5',
                        margin: '0',
                      }}
                    >
                      Best,<br />
                      <span style={{ color: '#F48FB1' }}>The Nomster Team</span>
                    </h1>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};
