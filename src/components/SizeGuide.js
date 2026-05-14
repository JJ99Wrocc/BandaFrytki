import React from 'react';
import '../css/SizeGuide.css';

const SizeGuide = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="size-modal-overlay" onClick={onClose}>
      <div className="size-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        
        <h3>Tabela Rozmiarów</h3>
        <p className="size-note">Wymiary mierzone na płasko (cm)</p>
        
        <table className="size-table">
          <thead>
            <tr>
              <th>Rozmiar</th>
              <th>Szerokość</th>
              <th>Długość</th>
              <th>Rękaw</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>XS</td><td>46</td><td>70</td><td>17</td></tr>
            <tr><td>S</td><td>50</td><td>73</td><td>18</td></tr>
            <tr><td>M</td><td>53</td><td>75</td><td>19</td></tr>
            <tr><td>L</td><td>56</td><td>77</td><td>20</td></tr>
            <tr><td>XL</td><td>59</td><td>79</td><td>21</td></tr>
            <tr><td>XXL</td><td>62</td><td>81</td><td>22</td></tr>
          </tbody>
        </table>
        <p className="producer-disclaimer">Producent dopuszcza różnice +/- 3,5%.</p>
      </div>
    </div>
  );
};

export default SizeGuide;